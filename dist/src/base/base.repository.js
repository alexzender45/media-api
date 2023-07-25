"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        common_1.Logger.log('BaseRepository.create');
        return await (0, objection_1.transaction)(this.model, async (Model) => {
            return Model.query().insertGraphAndFetch(data);
        });
    }
    async createMany(data) {
        common_1.Logger.log('BaseRepository.createMany');
        return await (0, objection_1.transaction)(this.model, async (Model) => {
            return Model.query().insert(data);
        });
    }
    async findAll(params) {
        common_1.Logger.log('BaseRepository.findAll');
        return this.model.query().orderBy('created_at', 'DESC');
    }
    async findManyWithGraphOrder(obj, relationPath, modifiers = {}) {
        common_1.Logger.log('BaseRepository.findAllWithGraph');
        return this.model
            .query()
            .where(obj)
            .withGraphFetched(relationPath)
            .modifiers(modifiers);
    }
    async findManyWithGraph(obj, relationPath) {
        common_1.Logger.log('BaseRepository.findAllWithGraph');
        return this.model
            .query()
            .where(obj)
            .withGraphFetched(relationPath)
            .orderBy('created_at', 'DESC');
    }
    async findOne(obj) {
        common_1.Logger.log('BaseRepository.findOne');
        return this.model.query().findOne(obj);
    }
    async findOneWithGraph(obj, relationPath) {
        common_1.Logger.log('BaseRepository.findOneWithGraph');
        return this.model.query().findOne(obj).withGraphFetched(relationPath);
    }
    async findMany(obj) {
        common_1.Logger.log('BaseRepository.findMany');
        return this.model.query().where(obj).orderBy('created_at', 'DESC');
    }
    async findById(id) {
        common_1.Logger.log('BaseRepository.findById');
        return this.model.query().findById(id);
    }
    async update(id, data) {
        common_1.Logger.log('BaseRepository.update');
        return this.model.query().patchAndFetchById(id, data);
    }
    async updateWithJersey(id) {
        common_1.Logger.log('BaseRepository.update');
        return this.model.query().patchAndFetch(id);
    }
    async updateWithGraphFetched(id, data, relationPath) {
        common_1.Logger.log('BaseRepository.update');
        return this.model
            .query()
            .patchAndFetchById(id, data)
            .withGraphFetched(relationPath);
    }
    async delete(id) {
        common_1.Logger.log('BaseRepository.delete');
        return this.model.query().deleteById(id);
    }
    async findManyByArray(obj, ids, field, relationPath) {
        common_1.Logger.log('BaseRepository.findManyByArray');
        return this.model
            .query()
            .where(obj)
            .whereIn(field, ids)
            .withGraphFetched(relationPath)
            .orderBy('created_at', 'DESC');
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map