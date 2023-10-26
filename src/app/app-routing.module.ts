import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { SpaceMarinesComponent } from './component/main/space-marines/space-marines.component';
import { SpaceMarineSoloComponent } from './component/main/space-marines/smace-marine-solo/space-marine-solo.component';
import { PatternMarinesComponent } from './component/main/space-marines/pattern-marines/pattern-marines.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'spacemarines/:id', component: SpaceMarinesComponent },
      {
        path: 'solo/:id',
        component: SpaceMarineSoloComponent,
      },
      { path: 'pattern', component: PatternMarinesComponent },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
