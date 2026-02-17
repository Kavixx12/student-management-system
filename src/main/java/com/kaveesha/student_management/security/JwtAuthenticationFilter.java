package com.kaveesha.student_management.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtTokenProvider jwtTokenProvider;
    private UserDetailsService userDetailsService;

    // Constructor Injection (මේ දෙන්නව අපිට ඕන වෙනවා)
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. Request එකෙන් Token එක එළියට ගන්නවා
        String token = getTokenFromRequest(request);

        // 2. Token එකක් තියෙනවද සහ ඒක Valid ද කියලා බලනවා
        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)){

            // 3. Token එකෙන් Username එක ගන්නවා
            String username = jwtTokenProvider.getUsername(token);

            // 4. ඒ Username එකට අදාළ User විස්තර Database එකෙන් ගන්නවා
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // 5. Authentication Object එකක් හදනවා (මේක තමයි පාස් එක)
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 6. Security Context එකට දානවා (දැන් Spring දන්නවා මේ User "Logged In" කියලා)
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        // ඊළඟ Filter එකට යන්න දෙනවා
        filterChain.doFilter(request, response);
    }

    // Request Header එකෙන් "Bearer " කෑල්ල කපලා Token එක විතරක් ගන්න Method එක
    private String getTokenFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }

        return null;
    }
}