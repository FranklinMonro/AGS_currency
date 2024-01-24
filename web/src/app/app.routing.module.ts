import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Main app routing. Includes the initial empty redirect.
 * @type {[{path: string; redirectTo: string; pathMatch: string}]}
 */
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})

export class AppRoutingModule {
}