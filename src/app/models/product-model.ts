import { QrcodeModel } from './qrcode-model';
import { CategoryModel } from './category-model';
import { UserModel } from './user-model';

export interface ProductModel {
    id: Number
    name: String
    slug: String
    description: String
    price: Number
    quantity: Number
    img_urls: any[]
    owner: UserModel
    category: CategoryModel
    qrcode: QrcodeModel
    replies: any[] 
    created_at: any[]
    favorites_count: any
    comments_count: any
    comments: any[]
    updated_at: any[]
}
