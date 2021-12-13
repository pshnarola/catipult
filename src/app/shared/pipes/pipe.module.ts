import { NgModule } from '@angular/core'; 
import { SafePipe } from './safe.pipe';
import { NumberFormatPipe } from './format.pipe';

@NgModule({
    declarations: [
        SafePipe,
        NumberFormatPipe
    ],
    exports: [
        SafePipe,
        NumberFormatPipe
    ]
})
export class SharedPipesModule {
}