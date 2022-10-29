import { IPaginationParams } from '../common/interface';
import { IRuleEngine, IRuleEngineFilter } from './ruleEngines.interface';
import { RuleEngineDocument, RuleEngineModel } from './ruleEngines.model';
import constant from './ruleEngines.constant';

const create = async (domain: IRuleEngine): Promise<RuleEngineDocument> => {
  return RuleEngineModel.create(domain);
};

const getList = async (
  filter: IRuleEngineFilter,
  paginationParams: IPaginationParams
): Promise<RuleEngineDocument[]> => {
  const { limit, offset, sortField, sortType } = paginationParams;
  var words: string[] = [];
  if (filter.searchText) {
    filter.searchText = filter.searchText.replace(
      constant.SPECIAL_CHARACTERS_REGEX,
      ''
    );
    words = filter.searchText?.split(' ').map((word: string): string => {
      return `.*${word}.*`;
    });
  }
  const regex: string = words.join('');
  filter.name = { $regex: regex, $options: '$i' };
  delete filter.searchText;
  return RuleEngineModel.find({
    ...filter
  })
    .limit(limit)
    .skip(offset)
    .sort({ [sortField]: sortType })
    .exec();
};
const getListWithoutPaginate = async (
  filter: Record<string, any>
): Promise<RuleEngineDocument[]> => {
  return RuleEngineModel.find(filter).exec();
};

const countByParameter = async (filter: IRuleEngineFilter): Promise<number> => {
  return RuleEngineModel.count(filter).exec();
};

const getById = async (id: string): Promise<RuleEngineDocument | null> => {
  return RuleEngineModel.findById(id).exec();
};

const getByIds = async (
  ids: string[]
): Promise<RuleEngineDocument[] | null> => {
  return RuleEngineModel.find({ _id: { $in: ids } }).exec();
};

const getPlainById = async (id: string): Promise<IRuleEngine | null> => {
  return RuleEngineModel.findById(id)
    .lean()
    .exec();
};

const findOneAndUpdateByIdAndBrandId = async (
  id: string,
  brandId: string | undefined,
  dataToUpdate: Partial<IRuleEngine>,
  isForceCreate: boolean = false
): Promise<RuleEngineDocument | null> => {
  let filter: Record<string, any> = { _id: id };
  if (brandId) filter.applyTo = brandId;
  return RuleEngineModel.findOneAndUpdate(filter, dataToUpdate, {
    upsert: isForceCreate,
    new: true,
    omitUndefined: true
  });
};

const deleteOne = async (id: string): Promise<boolean> => {
  const result = await RuleEngineModel.deleteOne({ _id: id });
  return !!result.ok && !!result.n && result.n > 0;
};

const deleteMany = async (ids: string[]): Promise<boolean> => {
  const result = await RuleEngineModel.deleteMany({ _id: { $in: ids } });
  return !!result.ok && !!result.n && result.n > 0;
};

const ruleEngineRepository = {
  create,
  getList,
  getById,
  getByIds,
  getListWithoutPaginate,
  getPlainById,
  findOneAndUpdateByIdAndBrandId,
  deleteOne,
  deleteMany,
  countByParameter
};

export default ruleEngineRepository;
