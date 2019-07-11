package com.miro.peoplecards;

public class Picture {
	public String id;
	public String imageUrl;

	@Override
	public String toString() {
		return "[" +
				"imageUrl='" + imageUrl + '\'' +
				']';
	}
}
