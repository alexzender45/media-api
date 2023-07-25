"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const user_repository_1 = require("./user.repository");
const axios_1 = require("axios");
const configs_1 = require("../configs");
const env = configs_1.EnvironmentService.getAll();
let UserService = class UserService {
    async create(data) {
        await this.throwIfUserExists(data);
        data.role = 'user';
        data.password = await this.utilService.hashPassword(data.password);
        const user = await this.userRepo.create(data);
        delete user.password;
        let token;
        try {
            const tokenData = { id: user.id, email: user.email, role: user.role };
            token = this.utilService.generateJwtToken(tokenData);
        }
        catch (e) {
            console.log(e);
            await this.rollbackUserAccount(user);
            throw new common_1.InternalServerErrorException(`Error generating JWT token: ${e.message}`);
        }
        return { user, auth_token: token };
    }
    async throwIfUserExists(data) {
        let existingUser;
        if (data.email) {
            existingUser = await this.userRepo.findOne({
                email: data.email.toLowerCase(),
            });
        }
        if (existingUser) {
            throw new common_1.ConflictException('User with the email address already exists');
        }
    }
    async rollbackUserAccount(user) {
        return await this.userRepo.delete(user.id);
    }
    async login(loginData) {
        const user = await this.userRepo.findOneWithGraph({ email: loginData.email }, '');
        if (!user) {
            throw new common_1.ConflictException('User with the email address does not exist');
        }
        const isPasswordMatched = await this.utilService.comparePassword(loginData.password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.ConflictException('Password does not match');
        }
        let token;
        try {
            const tokenData = { id: user.id, email: user.email, role: user.role };
            token = this.utilService.generateJwtToken(tokenData);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Error generating JWT token: ${e.message}`);
        }
        delete user.password;
        return { user, auth_token: token };
    }
    async findById(id) {
        const user = await this.userRepo.findOne({ id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getToken() {
        const headersRequest = {
            Authorization: 'Basic ' +
                Buffer.from(env.client_id + ':' + env.client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const { data } = await axios_1.default
            .post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: headersRequest,
        })
            .catch((err) => {
            throw new common_1.BadRequestException(err.response.data.error.message);
        });
        return data.access_token;
    }
    async searchTrack(query) {
        const token = await this.getToken();
        const headersRequest = { Authorization: `Bearer ${token}` };
        const { data } = await axios_1.default
            .get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: headersRequest,
        })
            .catch((err) => {
            throw new common_1.BadRequestException(err.response.data.error.message);
        });
        const trackData = await Promise.all(data.tracks.items.map(async (item) => {
            const trackName = item.name;
            const artistName = item.artists.map(artist => artist.name).join(', ');
            const albumName = item.album.name;
            const spotifyUrl = item.external_urls.spotify;
            const lyricsResponse = await axios_1.default.get(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get`, {
                params: {
                    q_track: trackName,
                    q_artist: artistName,
                    apikey: env.musixmatch_api_key
                }
            });
            const lyrics = lyricsResponse.data.message.body.lyrics;
            return {
                name: trackName,
                artist: artistName,
                album: albumName,
                spotify_url: spotifyUrl,
                lyrics
            };
        }));
        return trackData;
    }
};
__decorate([
    (0, common_1.Inject)(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], UserService.prototype, "userRepo", void 0);
__decorate([
    (0, common_1.Inject)(utils_1.UtilService),
    __metadata("design:type", utils_1.UtilService)
], UserService.prototype, "utilService", void 0);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map