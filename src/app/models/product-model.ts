import { QrcodeModel } from './qrcode-model';
import { CategoryModel } from './category-model';
import { UserModel } from './user-model';

export interface ProductModel {
    id: any
    name: String
    slug: String
    description: String
    price: any
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
    in_cart: any
}
