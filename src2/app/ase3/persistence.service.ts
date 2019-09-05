import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from './User';
import { FunctionRet } from './utitityClasses';
// key that is used to access the data in local storage
const STORAGE_KEY = 'local_users';
const IS_LOGGED_IN_KEY = 'logged_in';
@Injectable()
export class LocalStorageService {

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    }

    public storeOnLocalStorage(user: User): FunctionRet {

        var result: FunctionRet = new FunctionRet();

        // get array of users from local storage
        var verifyIdRes: boolean = this.verifyId(user);

        if (!(verifyIdRes)) {
            const currentUsers = this.storage.get(STORAGE_KEY) || [];
            // push new user to array

            currentUsers.push({
                title: user.Id,
                data: user
            });

            // insert updated array to local storage
            this.storage.set(STORAGE_KEY, currentUsers);
            result.Result = true;
            result.Message = 'Success';
        } else {
            result.Result = false;
            result.Message = 'Id is already existing. Hence, registration not possible!';
        }

        return result;
    }

    public verifyId(user: User): boolean {
        let result: boolean = false;
        // get users from local storage
        const currentUsers = this.storage.get(STORAGE_KEY) || [];

        for (var i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i].title == user.Id) {
                result = true;
                break;
            }
        }
        return result;
    }

    public verifyPwd(user: User): FunctionRet {
        var result: FunctionRet = new FunctionRet();
        // get users from local storage
        const currentUsers = this.storage.get(STORAGE_KEY) || [];

        for (var i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i].title == user.Id) {
                var enteredPwd: String = user.Pwd;
                if (enteredPwd == currentUsers[i].data.Pwd) {
                    result.Result = true;
                    result.Message = 'Success!';
                    //set logged in info
                    this.storage.set(IS_LOGGED_IN_KEY, true);
                } else {
                    result.Result = false;
                    result.Message = 'Authentication failed!';
                    this.storage.set(IS_LOGGED_IN_KEY, false);
                }
                break;
            }
        }
        return result;
    }

    public checkedLoggedIn(): boolean {
        var result: FunctionRet = new FunctionRet();
        // get loggedin info
        const loggedIn = this.storage.get(IS_LOGGED_IN_KEY) || false;
        return loggedIn;
    }

    public logout(): void {
        this.storage.set(IS_LOGGED_IN_KEY, false);
    }

}