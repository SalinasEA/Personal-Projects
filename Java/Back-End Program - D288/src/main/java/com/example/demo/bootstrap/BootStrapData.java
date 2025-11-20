package com.example.demo.bootstrap;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.entities.Customer;

@Component
public class BootStrapData implements CommandLineRunner{

    private final CustomerRepository customerRepository;

    public BootStrapData(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {

        long customerCount = customerRepository.count();
        
        if (customerCount < 6) {
            
            Customer sampleCustomer1 = new Customer();
            sampleCustomer1.setFirstName("Sample");
            sampleCustomer1.setLastName("Customer1");
            sampleCustomer1.setAddress("123 Main St");
            sampleCustomer1.setPostal_code("12345");
            sampleCustomer1.setPhone("555-1234");
    
            Customer sampleCustomer2 = new Customer();
            sampleCustomer2.setFirstName("Sample");
            sampleCustomer2.setLastName("Customer2");
            sampleCustomer2.setAddress("456 Elm St");
            sampleCustomer2.setPostal_code("67890");
            sampleCustomer2.setPhone("555-5678");
    
            Customer sampleCustomer3 = new Customer();
            sampleCustomer3.setFirstName("Sample");
            sampleCustomer3.setLastName("Customer3");
            sampleCustomer3.setAddress("789 Oak St");
            sampleCustomer3.setPostal_code("54321");
            sampleCustomer3.setPhone("555-9012");
    
            Customer sampleCustomer4 = new Customer();
            sampleCustomer4.setFirstName("Sample");
            sampleCustomer4.setLastName("Customer4");
            sampleCustomer4.setAddress("012 Pine St");
            sampleCustomer4.setPostal_code("09876");
            sampleCustomer4.setPhone("555-3456");
    
            Customer sampleCustomer5 = new Customer();
            sampleCustomer5.setFirstName("Sample");
            sampleCustomer5.setLastName("Customer5");
            sampleCustomer5.setAddress("345 Cedar St");
            sampleCustomer5.setPostal_code("11223");
            sampleCustomer5.setPhone("555-7890");
    
            customerRepository.save(sampleCustomer1);
            customerRepository.save(sampleCustomer2);
            customerRepository.save(sampleCustomer3);
            customerRepository.save(sampleCustomer4);
            customerRepository.save(sampleCustomer5);
    
            System.out.println("Sample customers added to the database: " + (customerRepository.count() - 1));
        }

        else {
            System.out.println("Database contains " + customerRepository.count() + " customers." );
        }
    }
}
