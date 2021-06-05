import { ProductModel } from './product-model';
import { UserModel } from './user-model';

export interface ReplyModel {
    id: Number
    user: UserModel
    product: ProductModel
    body: String
    created_at: any[]
    updated_at: any[]
}
