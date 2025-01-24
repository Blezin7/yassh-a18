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
  // getAll(): Observable<DBC[]> {
  //   return this.tutorialsRef.valueChanges({ idField: 'id' }).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching data:', error);
  //       return throwError(() => new Error('Error fetching data from Firestore'));
  //     })
  //   );
  // }

  // getById(id: string): Observable<DBC | undefined> {
  //   return this.tutorialsRef
  //     .doc<DBC>(id)
  //     .valueChanges()
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error fetching document:', error);
  //         return throwError(() => new Error('Error fetching document from Firestore'));
  //       })
  //     );
  // }

  // create(tutorial: DBC): Promise<any> {
  //   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //   return this.tutorialsRef.add({ ...tutorial, createdAt: timestamp, updatedAt: timestamp }).catch((error) => {
  //     console.error('Error creating document:', error);
  //     throw new Error('Error creating document in Firestore');
  //   });
  // }

  // update(id: string, data: Partial<DBC>): Promise<void> {
  //   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //   return this.tutorialsRef
  //     .doc(id)
  //     .update({ ...data, updatedAt: timestamp })
  //     .catch((error) => {
  //       console.error('Error updating document:', error);
  //       throw new Error('Error updating document in Firestore');
  //     });
  // }

  // delete(id: string): Promise<void> {
  //   return this.tutorialsRef
  //     .doc(id)
  //     .delete()
  //     .catch((error) => {
  //       console.error('Error deleting document:', error);
  //       throw new Error('Error deleting document in Firestore');
  //     });
  // }

  // getWithQuery(field: string, operator: firebase.firestore.WhereFilterOp, value: any): Observable<DBC[]> {
  //   return this.db
  //     .collection<DBC>(this.dbPath, (ref) => ref.where(field, operator, value))
  //     .valueChanges({ idField: 'id' })
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error fetching queried data:', error);
  //         return throwError(() => new Error('Error fetching queried data from Firestore'));
  //       })
  //     );
  // }
}
