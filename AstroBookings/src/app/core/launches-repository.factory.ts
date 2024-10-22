import { HttpClient } from '@angular/common/http';
import {
  LaunchesAbstractRepository,
  LaunchesMemoryRepository,
  LaunchesRestRepository,
} from '@app/services/launches.repository';
import { environment } from '../../environments/environment';

// ng g environments

/**
 * Launches Repository Factory, creates the correct implementation of the LaunchesRepository
 * @param http - HttpClient
 * @returns - LaunchesRepository, either LaunchesRestRepository or LaunchesMemRepository
 */
export function launchesRepositoryFactory(http: HttpClient): LaunchesAbstractRepository {
  if (environment.useRestApi) {
    return new LaunchesRestRepository(http);
  } else {
    return new LaunchesMemoryRepository();
  }
}
