import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";


import { BlogRoutingModule } from './blog-routing.module';

import { BloglistComponent } from '../blog/bloglist/bloglist.component';
import { BloggridComponent } from '../blog/bloggrid/bloggrid.component';
import { DetailComponent } from '../blog/detail/detail.component';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
    declarations: [BloglistComponent, BloggridComponent, DetailComponent],
    imports: [
        CommonModule,
        BlogRoutingModule,
        NgbNavModule,
        NgbTooltipModule,
        UIModule
    ]
})

export class BlogModule { }
