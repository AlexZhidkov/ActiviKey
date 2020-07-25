import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.css']
})
export class PartnersListComponent implements OnInit {
  isLoading = true;
  private partnersCollection: AngularFirestoreCollection<Partner>;
  partners: Observable<Partner[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.partnersCollection = this.afs.collection<Partner>('partners');
    this.partners = this.partnersCollection.valueChanges({ idField: 'id' });
    this.isLoading = false;
  }
}
