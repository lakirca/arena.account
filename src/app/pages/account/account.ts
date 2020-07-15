import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user';
import { SubSink } from 'subsink';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from 'src/app/shared/models/user-profile';
import { Address } from 'src/app/shared/models/address';
import { environment } from 'src/environments/develop';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/core/services/auth';
import { Email } from 'src/app/shared/models/email';
import { Phone } from 'src/app/shared/models/phone';
import { CookieService } from 'ngx-cookie-service';
import { SoundblockService } from 'src/app/core/services/soundblock';
import { NotificationsService } from 'src/app/core/services/notifications';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  private subs = new SubSink();
  cloudUrl: string = environment.cloudUrl;

  userId: any;
  file: any;

  addressConfig: any;
  address: Address = new Address();
  addressText: string;

  user: {
    name_first: any;
    name_last: any;
    name_middle: any;
  } = {
    name_first: '',
    name_last: '',
    name_middle: '',
  };

  emailText: string;
  emailLoaded: boolean;
  emailError: boolean;
  email: Email = new Email();
  emailConfig: any = {};
  oldEmail: any;

  phone: Phone = new Phone();
  phoneConfig: any;
  phoneLoaded: boolean;
  phoneText: string;
  oldPhone: string;
  phoneError: boolean;

  password: {
    old_password: any;
    password: string;
    password_confirmation: any;
    g2fa: boolean;
    force_reset: boolean;
  } = {
    old_password: '',
    password: '',
    password_confirmation: '',
    g2fa: false,
    force_reset: false,
  };
  passwordStrength = '';
  loadPostals: boolean;
  authError: boolean;

  private profileSubject: BehaviorSubject<UserProfile> = new BehaviorSubject(
    null
  );
  projectCount: any;
  serviceCount: any;
  projectsSubject: any;
  servicesSubject: any;

  get profile$(): Observable<UserProfile> {
    return this.profileSubject.asObservable();
  }

  private notificationsSubject: BehaviorSubject<any[]> = new BehaviorSubject(
    []
  );

  get notifications$(): Observable<any[]> {
    return this.notificationsSubject.asObservable();
  }

  emailsSubject: BehaviorSubject<Email[]> = new BehaviorSubject([]);

  get emails$(): Observable<Email[]> {
    return this.emailsSubject.asObservable();
  }

  phonesSubject: BehaviorSubject<Phone[]> = new BehaviorSubject([]);

  get phones$(): Observable<Phone[]> {
    return this.phonesSubject.asObservable();
  }

  loading;

  get isLoaded(): any {
    if (this.profileSubject.value) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private userService: UserService,
    private soundblockService: SoundblockService,
    private cookieService: CookieService,
    private notificationService: NotificationsService
  ) {}

  ionViewDidEnter() {
    this.userId = this.cookieService.get('user');

    this.getUserInfo();
    this.getServices();
    this.getProjects();
    this.getNotifications();
    this.getEmails(1);
    this.getPhones(1);
  }

  getUserInfo(id?) {
    this.subs.sink = this.userService.getUserInfo(this.userId).subscribe(
      (res: any) => {
        console.log('User: ', res);

        res.emails.forEach((e) => {
          if (e.flag_primary === 1) {
            res['email'] = e.user_auth_email;
          }
        });

        res.aliases.forEach((e) => {
          if (e.flag_primary === 1) {
            res['alias'] = e.user_alias;
          }
        });

        res.postals.forEach((e) => {
          if (e.flag_primary === 1) {
            res['postal'] = e;
          }
        });

        res.phones.forEach((e) => {
          if (e.flag_primary === 1) {
            res['phone'] = e.phone_number;
          }
        });

        res.bankings.forEach((e) => {
          if (e.flag_primary === 1) {
            res['bank'] = e;
          }
        });

        this.profileSubject.next(res);

        this.addressConfig = {
          id: 'addressPagination',
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: res.postals.length,
        };
        this.user.name_first = res.name_first;
        this.user.name_middle = res.name_middle;
        this.user.name_last = res.name_last;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  resetUserForm(nameForm: any) {
    nameForm.reset();
    nameForm.submitted = false;
  }

  updateName(form) {
    if (form.valid) {
      const body = {
        name_first: form.value.name_first,
        name_last: form.value.name_last,
        name_middle: form.value.name_middle,
      };
      this.loading = true;

      this.subs.sink = this.userService
        .updateUserName(body, this.userId)
        .subscribe(
          (res: any) => {
            form.submitted = false;
            this.loading = false;
            this.profileSubject.value.name = res.name;
          },
          (err: any) => {
            console.error(err);
            this.loading = false;
          }
        );
    }
  }

  onAvatarFormSubmit(file: FileList) {
    const formData: FormData = new FormData();
    formData.append('file', file[0], file[0].name);
    this.subs.sink = this.userService
      .updateAvatar(formData)
      .subscribe((res: any) => {
        console.log('File: ', res);
      });
  }

  securityUpdate(form) {
    if (form.valid) {
      const g2fa = form.value.g2fa === false ? 0 : 1;
      const force_reset = form.value.force_reset === false ? 0 : 1;

      const body = {
        old_password: form.value.old_password,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
        g2fa,
        force_reset,
      };

      this.subs.sink = this.userService
        .updatePassword(body, this.userId)
        .subscribe(
          (res: any) => {
            this.authError = false;
            form.reset();
            this.password.g2fa = undefined;
            this.password.force_reset = undefined;
            form.submitted = false;
          },
          (error) => {
            this.authError = true;
          }
        );
    }
  }

  viewPassword(field, status) {
    const passwordInput: any = document.getElementById(field);
    const passStatus: any = document.getElementById(status);

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passStatus.className = 'fe fe-eye-off';
    } else {
      passwordInput.type = 'password';
      passStatus.className = 'fe fe-eye';
    }
  }

  onChangePassword() {
    this.passwordStrength = AuthService.checkPasswordStrength(
      this.password.password
    );
  }

  // ===================
  //   Contact Section
  // ===================

  // Email Section
  getEmails(page) {
    this.emailLoaded = false;

    this.subs.sink = this.userService.getEmails(this.userId, page, 5).subscribe(
      (res: any) => {
        if (this.profileSubject.value) {
          if (res.data.length > 0) {
            res.data.forEach((email) => {
              if (email.flag_primary === 1) {
                this.profileSubject.value.email = email.user_auth_email;
              }
            });
          }
        }
        this.emailConfig = {
          id: 'emailPagination',
          itemsPerPage: 5,
          currentPage: res.meta.current_page,
          totalItems: res.meta.total,
        };

        this.emailsSubject.next(res.data);
        this.emailError = false;
        this.emailLoaded = true;
      },
      (err: Error) => {
        console.error(err);
        this.emailError = true;
        this.emailLoaded = true;
      }
    );
  }

  onEmailSave(emailForm: any) {
    const email = emailForm.value;

    if (emailForm.valid) {
      this.emailLoaded = false;
      if (email.flag_primary === true) {
        email.flag_primary = 1;
      } else if (email.flag_primary === false) {
        email.flag_primary = 0;
      } else if (parseInt(email.flag_primary) !== 1) {
        email.flag_primary = 0;
      }
      if (this.oldEmail) {
        // Edit email
        let body: any = {};

        if (this.oldEmail === email.user_auth_email) {
          body = {
            user: this.userId,
            user_auth_email: email.user_auth_email,
            flag_primary: parseInt(email.flag_primary),
          };
        } else {
          body = {
            old_user_auth_email: this.oldEmail,
            user: this.userId,
            user_auth_email: email.user_auth_email,
            flag_primary: parseInt(email.flag_primary),
          };
        }

        this.updateEmail(body);
        this.resetEmail(emailForm);
        this.oldEmail = '';
      } else {
        // Add New email
        const body = {
          user: this.userId,
          user_auth_email: email.user_auth_email,
          flag_primary: parseInt(email.flag_primary),
        };

        this.newEmail(body);
        this.resetEmail(emailForm);
      }
    }
  }

  newEmail(body) {
    this.subs.sink = this.userService.addEmail(body).subscribe(
      (res: any) => {
        this.getPhones(1);
        this.emailError = false;
      },
      (err: Error) => {
        console.error(err);
        this.emailError = true;
      }
    );
  }

  updateEmail(body) {
    this.subs.sink = this.userService.updateEmail(body).subscribe(
      (res: any) => {
        this.getEmails(1);
        this.emailError = false;
      },
      (err: Error) => {
        console.error(err);
        this.emailError = true;
      }
    );
  }

  setAsPrimaryEmail(email) {
    this.emailLoaded = false;
    const body = {
      user: this.userId,
      old_user_auth_email: email.user_auth_email,
      flag_primary: 1,
    };

    this.subs.sink = this.userService.updateEmail(body).subscribe(
      (res: any) => {
        this.getEmails(1);
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  resetEmail(emailForm: any) {
    emailForm.reset();
    emailForm.submitted = false;
    this.email.flag_primary = 0;
  }

  editEmail(item) {
    this.oldEmail = item.user_auth_email;
    this.email = Object.assign({}, item);
  }

  removeEmail(email) {
    this.emailLoaded = false;
    const body = {
      user: this.userId,
      user_auth_email: email.user_auth_email,
    };

    this.subs.sink = this.userService
      .deleteEmail(body)
      .subscribe((res: any) => {
        this.getEmails(1);
      });
  }

  emailPageChanged(page) {
    this.emailLoaded = false;
    this.getEmails(page);
  }

  // Phone Section
  getPhones(page) {
    this.subs.sink = this.userService.getPhone(this.userId, page, 5).subscribe(
      (res: any) => {
        if (this.profileSubject.value) {
          if (res.data.length > 0) {
            res.data.forEach((phone) => {
              if (phone.flag_primary === 1) {
                this.profileSubject.value.phone = phone;
              }
            });
          }
        }

        this.phoneConfig = {
          id: 'phonePagination',
          itemsPerPage: 5,
          currentPage: res.meta.current_page,
          totalItems: res.meta.total,
        };

        this.phonesSubject.next(res.data);
        this.phoneError = false;
        this.phoneLoaded = true;
      },
      (err: Error) => {
        console.error(err);
        this.phoneError = true;
        this.phoneLoaded = true;
      }
    );
  }

  onPhoneSave(phoneForm: any) {
    const phone = phoneForm.value;

    if (phoneForm.valid) {
      this.phoneLoaded = false;
      if (phone.flag_primary === 1) {
        phone.flag_primary = true;
      } else if (phone.flag_primary === 0) {
        phone.flag_primary = false;
      } else if (
        phone.flag_primary === undefined ||
        phone.flag_primary === null
      ) {
        phone.flag_primary = false;
      }
      if (this.oldPhone) {
        // Edit Phone
        const body = {
          old_phone_number: this.oldPhone,
          user: this.userId,
          phone_type: phone.phone_type,
          phone_number: phone.phone_number,
          flag_primary: phone.flag_primary,
        };

        this.updatePhone(body);
        this.resetPhone(phoneForm);
        this.oldPhone = '';
      } else {
        // Add New Phone
        const body = {
          user: this.userId,
          phone_type: phone.phone_type,
          phone_number: phone.phone_number,
          flag_primary: phone.flag_primary,
        };

        this.newPhone(body);
        this.resetPhone(phoneForm);
      }
    }
  }

  newPhone(body) {
    this.subs.sink = this.userService.addPhone(body).subscribe(
      (res: any) => {
        this.getPhones(1);
        this.phoneError = false;
      },
      (err: Error) => {
        console.error(err);
        this.phoneError = true;
      }
    );
  }

  updatePhone(body) {
    this.subs.sink = this.userService.updatePhone(body).subscribe(
      (res: any) => {
        this.getPhones(1);
        this.phoneError = false;
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  setAsPrimaryPhone(phone) {
    this.phoneLoaded = false;

    const body = {
      user: this.userId,
      old_phone_number: phone.phone_number,
      flag_primary: 1,
    };

    this.updatePhone(body);
  }

  editPhone(item) {
    this.oldPhone = item.phone_number;
    this.phone = Object.assign({}, item);
  }

  removePhone(phone) {
    this.phoneLoaded = false;

    const body = {
      user: this.userId,
      phone_number: phone.phone_number,
    };

    this.subs.sink = this.userService
      .deletePhone(body)
      .subscribe((res: any) => {
        this.getPhones(1);
      });
  }

  phonePageChanged(page) {
    this.phoneLoaded = false;
    this.getPhones(page);
  }

  resetPhone(phoneForm) {
    phoneForm.reset();
    phoneForm.submitted = false;
    this.phone = Object.assign({}, null);
  }

  // ====================
  //   Address Section
  // ====================

  // GET addresses
  getAddresses(page) {
    this.loadPostals = true;
    this.subs.sink = this.userService
      .getUsersAddresses(this.userId, page, 5)
      .subscribe(
        (res: any) => {
          this.profileSubject.value.postals = res.data;
          this.addressConfig = {
            id: 'addressPagination',
            itemsPerPage: 5,
            currentPage: res.meta.current_page,
            totalItems: res.meta.total,
          };

          this.loadPostals = false;
        },
        (err: any) => {
          this.loadPostals = false;
        }
      );
  }

  resetAddress(form) {
    form.reset();
    form.submitted = false;
    this.address = Object.assign({}, null);
  }

  onAddressSave(form) {
    const address = form.value;

    if (form.valid) {
      if (address.flag_primary === true) {
        address.flag_primary = 1;
      } else if (address.flag_primary === false) {
        address.flag_primary = 0;
      }
      if (address.postal_uuid) {
        // Edit Address
        const body = {
          postal: address.postal_uuid,
          user: this.userId,
          postal_type: address.postal_type,
          postal_street: address.postal_street,
          postal_city: address.postal_city,
          postal_country: address.postal_country,
          postal_zipcode: address.postal_zipcode,
          flag_primary: address.flag_primary,
        };

        this.updateAddress(body);
        this.resetAddress(form);
      } else {
        // Add New Address
        const body = {
          user: this.userId,
          postal_type: address.postal_type,
          postal_street: address.postal_street,
          postal_city: address.postal_city,
          postal_country: address.postal_country,
          postal_zipcode: address.postal_zipcode,
          flag_primary: address.flag_primary,
        };

        this.newAddress(body);
        this.resetAddress(form);
      }
    }
  }

  updateAddress(body) {
    this.subs.sink = this.userService
      .updateAddress(body)
      .subscribe((res: any) => {
        this.getAddresses(1);
      });
  }

  newAddress(body) {
    this.subs.sink = this.userService
      .addNewAddress(body)
      .subscribe((res: any) => {
        this.getAddresses(1);
      });
  }

  editAddress(address) {
    this.address = Object.assign([], address);
  }

  setAsPrimaryAddress(address) {
    const body = {
      user: this.userId,
      postal: address.postal_uuid,
      postal_type: address.postal_type,
      postal_street: address.postal_street,
      postal_city: address.postal_city,
      postal_country: address.postal_country,
      postal_zipcode: address.postal_zipcode,
      flag_primary: 1,
    };

    this.updateAddress(body);
  }

  removeAddress(address) {
    const body = {
      postal: address.postal_uuid,
    };

    this.subs.sink = this.userService
      .deleteAddress(body)
      .subscribe((res: any) => {
        this.getAddresses(1);
      });
  }

  pageChanged(page) {
    this.getAddresses(page);
  }

  // Soundblock section
  getProjects() {
    this.subs.sink = this.soundblockService
      .getUsersProjects(this.userId)
      .subscribe((res: any) => {
        console.log('Projects: ', res);
        this.projectCount = res.length;
      });
  }

  getServices() {
    this.subs.sink = this.soundblockService
      .getUsersServices(this.userId)
      .subscribe((res: any) => {
        console.log('Services: ', res);
        this.serviceCount = res.length;
      });
  }

  // Notifications
  getNotifications() {
    this.subs.sink = this.notificationService
      .getNotifications(4)
      .subscribe((res: any) => {
        console.log('Notifications: ', res);

        this.notificationsSubject.next(res.data);

        this.addressConfig = {
          id: 'addressPagination',
          itemsPerPage: 5,
          currentPage: res.meta.current_page,
          totalItems: res.meta.total,
        };
      });
  }

  ionViewDidLeave() {
    this.profileSubject.next(null);
    this.subs.unsubscribe();
  }
}
