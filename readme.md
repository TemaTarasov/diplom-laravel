# Diplom

## Setup project

1. Copy `env.example` and rename to `env`.

2. Generate app key `php artisan key:generate`

3. Install composer `composer install`

4. Install node_modules `npm install` or `yarn install`

5. Build project `npm run prod` or `yarn prod`

6. Setup DB `php artisan migrate`

7. Database: Seeding `php artisan db:seed`

8. Start Server `php artisan serve`

9. Go to [localhost:8000/dashboard](http://localhost:8000/dashboard)

Local Credentials:
```
Admin
  Login: admin
  email: admin@example.com
  Password: admin
  
Service-admin
  Login: service-admin
  email: service-admin@example.com
  Password: service-admin
```

## Direcotry
```
diplom-laravel
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── *.php => Controllers
│   └── *.php => Models
├── resources/
│   ├── assets/
│   │   ├── js/
│   │   │   └── *.js => JavaScript
│   │   └── less/
│   │       └── *.less => Styles
│   └── views/
│       └── *.blade.php => Views
└── routes/
    └── web.php => Router
```

### Created by Artem Tarasov.