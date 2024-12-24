import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApproveComponent } from './approve/approve.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { SignupComponent } from './signup/signup.component';
import { TeamWorkComponent } from './team-work/team-work.component';
import { AuthguardService } from './shared/authguard.service';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'products/prod-details', component: ProductdetailsComponent, canActivate: [AuthguardService], data: { role: 'subscriber' } },
  { path: 'contact', component: ContactComponent },
  { path: 'career', component: CareerComponent },
  { path: 'team-work', component: TeamWorkComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthguardService], data: { role: 'admin' } },
  { path: 'approve', component: ApproveComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
