import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { UtilService } from '../utils';
import { CreateUserDto } from './dto';
import { UserRepository } from './user.repository';
import axios from 'axios';
import { EnvironmentService } from '../configs';


const env = EnvironmentService.getAll();

@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepo: UserRepository;
  @Inject(UtilService)
  private readonly utilService: UtilService;

  public async create(data: CreateUserDto) {
    await this.throwIfUserExists(data);

    // Hash password
    data.role = 'user';
    data.password = await this.utilService.hashPassword(data.password);
    // Create user
    const user = await this.userRepo.create(data);
    delete user.password;
    let token;
    try {
      const tokenData = { id: user.id, email: user.email, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
    } catch (e) {
      console.log(e);
      // Delete user and address if token generation fails
      await this.rollbackUserAccount(user);
      // Throw error
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }
    return { user, auth_token: token };
  }

  public async throwIfUserExists(data: CreateUserDto): Promise<void> {
    let existingUser;

    // check if user exists using email
    if (data.email) {
      existingUser = await this.userRepo.findOne({
        email: data.email.toLowerCase(),
      });
    }

    if (existingUser) {
      throw new ConflictException('User with the email address already exists');
    }
  }


  public async rollbackUserAccount(user: any): Promise<void> {
    return await this.userRepo.delete(user.id);
   }

   // login
   public async login(loginData: any): Promise<any> {
    const user = await this.userRepo.findOneWithGraph(
      { email: loginData.email },
     '',
    );
    if (!user) {
      throw new ConflictException('User with the email address does not exist');
    }

    // Check if password matches
    const isPasswordMatched = await this.utilService.comparePassword(
      loginData.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new ConflictException('Password does not match');
    }

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, email: user.email, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
      // Update login count
    } catch (e) {
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }
    delete user.password;
    return { user, auth_token: token };
  }

  public async findById(id: string): Promise<any> {
    const user = await this.userRepo.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async getToken() {
    const headersRequest = {
      Authorization:
        'Basic ' +
        Buffer.from(env.client_id+ ':' + env.client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const { data } = await axios
      .post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: headersRequest,
      })
      .catch((err) => {
        throw new BadRequestException(err.response.data.error.message);
      }
      );
    return data.access_token;

  }

  public async searchTrack(query: string) {
    try {
    const token = await this.getToken();
    const headersRequest = { Authorization: `Bearer ${token}` };
    const { data } = await axios
    .get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: headersRequest,
    })
    .catch((err) => {
      console.log(err)
        throw new BadRequestException(err.response.data.error.message);
    });

const trackData = await Promise.all(data.tracks.items.map(async item => {
    const trackName = item.name;
    const artistName = item.artists.map(artist => artist.name).join(', ');
    const albumName = item.album.name;
    const spotifyUrl = item.external_urls.spotify;
    const albumArtUrl = item.album.images[0]?.url; // Get URL of album art

    // Get lyrics from Musixmatch
    const lyricsResponse = await axios.get(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get`, {
        params: {
            q_track: trackName,
            q_artist: artistName,
            apikey: env.musixmatch_api_key
        }
    });

    const lyrics = lyricsResponse.data.message.body.lyrics;

    // Get YouTube video
    const youtubeResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            maxResults: 1,
            q: `${trackName} ${artistName}`,
            key: env.youtube_api_key,
            type: 'video'
        }
    });
    const youtubeVideoId = youtubeResponse.data.items[0]?.id?.videoId;
    const youtubeVideoUrl = youtubeVideoId ? `https://www.youtube.com/watch?v=${youtubeVideoId}` : null;

    return {
        name: trackName,
        artist: artistName,
        album: albumName,
        spotify_url: spotifyUrl,
        lyrics,
        youtube_video_url: youtubeVideoUrl,
        album_art_url: albumArtUrl // Added field for album art URL
    };
}));

return trackData;

  }
  catch (e) {
   // console.log(e)
    throw new InternalServerErrorException(
      `Error generating JWT token: ${e.message}`,
    );
  }
}
  }
