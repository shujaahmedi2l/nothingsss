import {SimpleChanges} from "@angular/core";
import { stringify } from "./json-helper";

export function updateInputBindingOnChanges(target: any = {}, changes: SimpleChanges, cb?: Function) {
  const newInputBindings: any = {};
  Object.keys(changes)
    .filter((k: string) => !changes[k].isFirstChange()
      && stringify(changes[k].previousValue) !== stringify(changes[k].currentValue))
    .forEach((k: string) => (newInputBindings[k] = changes[k].currentValue));
  if (Object.keys(newInputBindings).length > 0) {
    if (cb) {
      cb(newInputBindings);
    } else {
      Object.assign(target, newInputBindings);
    }
  }
}
