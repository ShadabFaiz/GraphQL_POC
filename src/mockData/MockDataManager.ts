import { User } from "../entities/User/User";
import { UserDao } from "../dao/User/UserDao";

// import { User } from "../entities/User/User";

// import { User } from "../entities/User/User";

export class MockDataManager {

    // private userCounter = 1;
    private static instance: MockDataManager;

    public static getInstance() {
        if (!MockDataManager.instance) MockDataManager.instance = new MockDataManager();
        return MockDataManager.instance;
    }


    public createRandomUsers(quantity: number) {
        let dao = UserDao.getInstance();
        let original = quantity;
        let inter = setInterval(() => {
            let user = this.createUser(quantity);
            dao.create(user).then(() => { console.log(`User ${(original - quantity)} created`) });
            if (quantity-- < 1) clearInterval(inter);
            // let user = this.createUser(quantity);
            // dao.create(user).then(() => console.log(`${original - quantity} user created...`));
        }, 1);

        // while (quantity-- > 0) {
        //     let user = this.createUser(quantity);
        //     dao.create(user).then(res => console.log(`User ${res.userId} created...`));
        // }
    }

    private createUser(prefix: number) {
        let user = new User();
        user.Address = prefix + '_testAddress';
        user.MobileNo = this.generateRandomMobileno();
        user.Occupation = this.generateRandomNumber(0, 111111) + '_occupation';
        user.Organization = this.generateRandomNumber(0, 1111) + '_organisation';
        user.age = this.generateRandomNumber(0, 70);
        user.dateOfBirth = new Date(this.generateRandomNumber(0, 31) + '/' + this.generateRandomNumber(1, 12) + '/' + this.generateRandomNumber(1950, 2014));
        user.emailId = prefix + '_emailid@custom.com';
        user.firstname = prefix + '_firstname';
        user.gender = this.generateRandomNumber(1, 2) - 1 === 1 ? 'M' : 'F';
        user.lastname = this.generateRandomNumber(0, 999) + '_lastname';
        user.username = prefix + '_username';
        return user;
    }

    private generateRandomMobileno() {
        let counter = 10;
        let mobileNo = '';
        while (counter-- > 0)
            mobileNo += this.generateRandomNumber(0, 9);
        return +mobileNo;
    }

    private generateRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}