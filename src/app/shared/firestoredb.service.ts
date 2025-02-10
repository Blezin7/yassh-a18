import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface DBC {
  id: string
  name: string
  image: string
  details: string
  composition: string
  indication: string
  editing?: boolean 
  productCategories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FirestoredbService {

  constructor(private db: AngularFirestore) {}

  addProduct(product: DBC): Promise<any> {
    product.id = this.db.createId()
    return this.db.collection('/Catalogue').add(product)
  }

  getAll(){
    return this.db.collection('/Catalogue').snapshotChanges()
  }

  deleteProduct(product: DBC): Promise<any> {
    return this.db.collection('/Catalogue').doc(product.id).delete()
  }

  async updateProduct(product: DBC): Promise<any> {
    return this.db.collection('/Catalogue').doc(product.id).update(product);
  }
}
