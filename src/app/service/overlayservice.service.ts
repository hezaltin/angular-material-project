import { Injectable, Injector } from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  PositionStrategy,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import {
  OverlayContent,
  OverlayTreeRef,
} from '../shared/tree-overlay/overlay-tree-ref';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { TreeOverlayComponent } from '../shared/tree-overlay/tree-overlay.component';

export interface OverlayParams<T> {
  origin: HTMLElement;
  content: OverlayContent;
  data?: T;
  width?: string | number;
  height: string | number;
}

@Injectable({ providedIn: 'root' })
export class OverlayTree {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>({
    origin,
    content,
    data,
    width,
    height,
  }: OverlayParams<T>): OverlayTreeRef<T> {
    const overlayRef = this.overlay.create(
      this.getOverlayConfig({ origin, width, height })
    );
    const overlayTreeRef = new OverlayTreeRef<T>(overlayRef, content, data);
    const injector = this.createInjector(overlayTreeRef, this.injector);
    overlayRef.attach(
      new ComponentPortal(TreeOverlayComponent, null, injector)
    );
    return overlayTreeRef;
  }

  private getOverlayConfig({ origin, width, height }): OverlayConfig {
    return new OverlayConfig({
      width,
      height,
      hasBackdrop: true,
      backdropClass: 'popover-backdrop',
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
    ];
  }

  createInjector(overlayTreeRef: OverlayTreeRef, injector: Injector) {
    const tokens = new WeakMap([[OverlayTreeRef, overlayTreeRef]]);
    return new PortalInjector(injector, tokens);
  }
}
