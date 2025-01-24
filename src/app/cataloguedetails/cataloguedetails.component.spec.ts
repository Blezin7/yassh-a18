import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguedetailsComponent } from './cataloguedetails.component';

describe('CataloguedetailsComponent', () => {
  let component: CataloguedetailsComponent;
  let fixture: ComponentFixture<CataloguedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CataloguedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
