import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApproveComponent } from './approve/approve.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { TeamWorkComponent } from './team-work/team-work.component';
import { AuthguardService } from './shared/authguard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CataloguedetailsComponent } from './cataloguedetails/cataloguedetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    children:[  { path: 'proditem/:id', component: ProductdetailsComponent, 
    canActivate: [AuthguardService], data: { role: 'subscriber'} 
  },]
   },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'products/cataloguedetails/:id', component: CataloguedetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'career', component: CareerComponent },
  { path: 'team-work', component: TeamWorkComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent), 
    canActivate: [AuthguardService], data: { role: 'admin' } 
  },
  { path: 'approve', component: ApproveComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'join-us', component: JoinUsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
