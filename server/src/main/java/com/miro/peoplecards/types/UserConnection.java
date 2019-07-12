package com.miro.peoplecards.types;

public class UserConnection {
//	public String type;
	public String role;
	public  User user;
//	public Account account;
//	public Date modifiedAt;
//	public User modifiedBy;
//	public Date createdAt;
//	public User createdBy;
	public String id;

	@Override
	public String toString() {
		return "[" +
//				"role='" + role + '\'' +
				", user=" + user +
//				", id='" + id + '\'' +
				']';
	}
}