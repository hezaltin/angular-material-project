import { Component, OnInit, TemplateRef } from '@angular/core';
import { OverlayContent, OverlayTreeRef } from './overlay-tree-ref';

@Component({
  templateUrl: './tree-overlay.component.html',
  styleUrls: ['./tree-overlay.component.css']
})
export class TreeOverlayComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: OverlayContent;
  context;

  constructor(private overlayTreeRef: OverlayTreeRef) {
  }

  ngOnInit() {
    this.content = this.overlayTreeRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.overlayTreeRef.close.bind(this.overlayTreeRef)
      }
    }

  }

}
