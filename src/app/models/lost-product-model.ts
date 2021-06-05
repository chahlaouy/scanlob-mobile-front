import { UserModel } from './user-model';
import { CategoryModel } from './category-model';
export interface LostProductModel {
    id: Number
    name: String
    slug: String
    img_urls: any[]
    user: UserModel
    category: CategoryModel 
    location: any[]
    founded: boolean
    created_at: any[]
    updated_at: any[]
}
