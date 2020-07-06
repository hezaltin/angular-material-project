import { TemplateRef, Type } from '@angular/core'
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export interface OverlayCloseEvent<T> {
    type: 'backdropClick' | 'close';
    data: T
};

export type OverlayContent = TemplateRef<any> | Type<any> | string;

export class OverlayTreeRef<T = any> {
    private afterClosed = new Subject<OverlayCloseEvent<T>>();
    afterClosed$ = this.afterClosed.asObservable();

    constructor(public overlay: OverlayRef, public content: OverlayContent, public data: T) {
        overlay.backdropClick().subscribe(() => this._close('backdropClick', data));
    }

    close(data?: T) {
        this._close('close', data);
    }

    private _close(type, data) {
        this.overlay.dispose();
        this.afterClosed.next({
            type,
            data
        });
        this.afterClosed.complete();
    }
}
