import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog-details', component: BlogDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
