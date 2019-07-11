package com.miro.peoplecards;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UsersController {

	private static final String TOKEN = "2c1b55c7-1dad-44f2-8149-b83c4521f29b";
	private static final long ACCOUNT_ID = 3074457346591961673L;
	private static final String API_ROOT = "https://api.miro.com/v1/";


	private static final String API_REQUEST_TEMPLATE = "https://api.miro.com/v1/%s";

	@CrossOrigin(origins = "https://olga-st.github.io")
	@RequestMapping("/users")
	public List<User> users(@RequestParam(value = "name", defaultValue = "World") String name) throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();

		String fields = "user{name,picture{imageUrl},email}";
		String connectionsUrl = String.format(API_REQUEST_TEMPLATE, "accounts/" + ACCOUNT_ID + "/user-connections");

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(connectionsUrl)
				.queryParam("fields", fields)
				.queryParam("access_token", TOKEN);
		UriComponents uriComponents = builder.build().encode();

		UserConnectionList resp = restTemplate.getForObject(uriComponents.toUri(), UserConnectionList.class);
		System.out.println("UsersController.users " + resp.data);
		return resp.data.stream().map(c -> c.user).collect(Collectors.toList());
	}
}
