import { Repository } from "./repository.model";

export interface Repositories {
  repo_count: number;
  language: string;
  results: Repository[];
}
