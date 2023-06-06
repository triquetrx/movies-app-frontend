import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/interfaces/IAuth';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(users: IUser[], searchText: string): IUser[] {
    if (!searchText) return users;
    return users.filter(
      (user) =>
        user.firstName.includes(searchText) ||
        user.loginId.includes(searchText) ||
        user.email.includes(searchText)
    );
  }
}
