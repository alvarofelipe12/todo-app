import { Observable } from "rxjs";

export abstract class RemoteConfigRepository {
  abstract fetchAndActivate(): Observable<boolean>;
}
