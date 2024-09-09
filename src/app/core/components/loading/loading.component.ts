import { Component, Input } from '@angular/core';
import { SharedComponentModule } from '../../shared/shared.module';


@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: true,
    imports: [SharedComponentModule]

})
export class LoadingComponent {
    @Input() diameter: number = 40; // Puedes pasar el tamaño del spinner como Input
    @Input() strokeWidth: number = 4; // Puedes configurar el grosor
}
