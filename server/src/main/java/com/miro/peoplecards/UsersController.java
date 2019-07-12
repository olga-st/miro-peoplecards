package com.miro.peoplecards;

import com.miro.peoplecards.types.OauthToken;
import com.miro.peoplecards.types.User;
import com.miro.peoplecards.types.UserConnectionList;
import com.miro.peoplecards.types.UsersRequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UsersController {

	private static final String API_ROOT = "https://api.miro.com/v1/";

	@CrossOrigin(origins = "https://olga-st.github.io")
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public List<User> users(@RequestBody UsersRequestBody body) {
		OauthToken tokenInfo = request(API_ROOT + "oauth-token", body.getToken(), OauthToken.class);

		String connectionsUrl = API_ROOT + "accounts/" + tokenInfo.account.id + "/user-connections";
		String fields = "user{name,picture{imageUrl},email}";
		int limit = 100;
		int offset = 0;
		String nextLink = "";

		List<User> users = new ArrayList<>();
		while (nextLink != null) {
			UserConnectionList resp = request(connectionsUrl, body.getToken(), UserConnectionList.class,
					"fields", fields, "limit", "" + limit, "offset", "" + offset);
			nextLink = resp.nextLink;
			offset += limit;

			resp.data.forEach(c -> users.add(c.user));
		}

		return users;
	}

	private <T> T request(String connectionsUrl, String token, Class<T> respType, String... params) {
		RestTemplate restTemplate = new RestTemplate();

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(connectionsUrl)
				.queryParam("access_token", token);

		for (int i = 0; i < params.length; i += 2) {
			builder = builder.queryParam(params[i], params[i + 1]);
		}
		UriComponents uriComponents = builder.build().encode();

		return restTemplate.getForObject(uriComponents.toUri(), respType);
	}

}
