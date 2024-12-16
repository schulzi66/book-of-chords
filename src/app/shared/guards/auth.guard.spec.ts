import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserStore } from '../state/user.store';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    let userStore: jasmine.SpyObj<UserStore>;
    const mockRoute = new ActivatedRouteSnapshot();
    const mockSnapshot = {} as RouterStateSnapshot;

    beforeEach(() => {
        userStore = jasmine.createSpyObj('UserStore', ['user'], {
            user: jasmine.createSpy().and.returnValue(undefined),
        });

        TestBed.configureTestingModule({
            providers: [{ provide: UserStore, useValue: userStore }],
        });
    });

    it('should allow access when user is authenticated', () => {
        // Arrange
        const mockUser = {
            uid: '123',
            email: 'test@test.com',
            photoURL: 'https://example.com/photo.jpg',
            displayName: 'Test User',
        };
        userStore.user.and.returnValue(mockUser);

        // Act
        const result = executeGuard(mockRoute, mockSnapshot);

        // Assert
        expect(result).toBe(true);
        expect(userStore.user).toHaveBeenCalled();
    });

    it('should deny access when user is not authenticated', () => {
        // Arrange
        userStore.user.and.returnValue(undefined);

        // Act
        const result = executeGuard(mockRoute, mockSnapshot);

        // Assert
        expect(result).toBe(false);
        expect(userStore.user).toHaveBeenCalled();
    });
});
