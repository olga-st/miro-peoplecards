package com.miro.peoplecards;

public class User {
	public String email;
	public String name;
	public String id;
	public  Picture picture;

	@Override
	public String toString() {
		return "[" +
				"email='" + email + '\'' +
				", name='" + name + '\'' +
				", id='" + id + '\'' +
				", picture=" + picture +
				']';
	}
}
