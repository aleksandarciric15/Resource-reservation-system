package dev.api_composition;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "dev.api_composition.clients")
public class ApiCompositionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiCompositionApplication.class, args);
	}

}
