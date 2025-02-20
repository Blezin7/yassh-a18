import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPosition = new BehaviorSubject<number>(0);

  setScrollPosition(position: number): void {
    this.scrollPosition.next(position);
  }

  getScrollPosition(): number {
    return this.scrollPosition.value;
  }
}
