import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedComponentModule } from '../../shared/shared.module';



@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [SharedComponentModule, CommonModule, RouterModule],
})
export class LayoutComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    constructor(
        private _router: Router,
        private breakpointObserver: BreakpointObserver,
    ) {

    }

    changeRoute(route: string) {
        this._router.navigateByUrl(route);
    }



}
