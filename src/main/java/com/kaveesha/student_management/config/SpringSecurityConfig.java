package com.kaveesha.student_management.config;

import com.kaveesha.student_management.security.JwtAuthenticationFilter;
import com.kaveesha.student_management.security.JwtAuthenticationEntryPoint;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;
    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((authorize) -> {
                    // 1. මේ URLs වලට කාට වුනත් එන්න පුළුවන් (Login & Register)
                    authorize.requestMatchers("/api/auth/**").permitAll();

                    // 2. Options Method එකට ඉඩ දෙන්න (React Pre-flight requests වලට)
                    authorize.requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll();

                    // 3. අනිත් හැම URL එකකටම අනිවාර්යයෙන්ම Log වෙලා ඉන්න ඕන
                    authorize.anyRequest().authenticated();
                }).httpBasic(Customizer.withDefaults());

        // Exception Handling (වැරදි ටෝකන් එකක් ආවොත් මොකද කරන්නේ)
        http.exceptionHandling( exception -> exception
                .authenticationEntryPoint(authenticationEntryPoint));

        // Session Management (අපි Stateless විදිහට වැඩ කරන්නේ, Session තියාගන්නේ නෑ)
        http.sessionManagement( session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // අපේ Filter එක දානවා
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}