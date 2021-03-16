import { ValidationFailure } from './validationFailure';

export interface SaveResult {
    readonly isSuccessful?: boolean | null;
    readonly errorMessage?: string | null;
    validationFailures?: ValidationFailure[] | null;
}
