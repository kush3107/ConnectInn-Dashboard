import {URLSearchParams} from '@angular/http';
import {Action} from "@ngrx/store";

export class Utils {
  static objToSearchParams(obj): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return params;
  }

  static removeKey(obj, deleteKey) {
    return Object.keys(obj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = obj[current];
        return result;
      }, {});
  }

  static normalize(entityArray: Entity[]) {
    const result = {};
    for (let i = 0; i < entityArray.length; i++) {
      result[entityArray[i].id] = entityArray[i];
    }

    return result;
  }

  static normalizedObjToArray(object: { [id: number]: any }) {
    const result = [];
    for (let i = 1; i <= Object.keys(object).length; i++) {
      result.push(object[i]);
    }

    return result;
  }

  static getObjectValues(object: { [id: number]: any }) {
    const vals = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        vals.push(object[key]);
      }
    }
    return vals;
  }

  static removeNullFields(data: Object) {
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    return data;
  }

  static objectIsEquivalent(obj1, obj2) {
    // Create arrays of key names
    const obj1keys = Object.keys(obj1);
    const obj2keys = Object.keys(obj2);

    // If number of properties is different,
    // objects are not equivalent
    if (obj1keys.length !== obj2keys.length) {
      return false;
    }

    for (let i = 0; i < obj1keys.length; i++) {
      const keyName = obj1keys[i];
      // If values of same property are not equal,
      // objects are not equivalent
      if (obj1[keyName] !== obj2[keyName]) {
        return false;
      }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}

interface Entity {
  id: number;
}

export interface ActionWithPayload extends Action {
  payload?: any;
}
