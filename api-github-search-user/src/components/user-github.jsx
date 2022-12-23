import React, { useState, useEffect } from "react";
import './style.scss';
import ApiUser from "./ApiUser";

function App() {
	
	const [searchUser, setSearchUser] = useState('');
	const [user, setUser] = useState('');
	const [reposUser, setReposUser] = useState('');
	const [followersUser, setFollowersUser] = useState('');
	const [followingUser, setFollowingUser] = useState('');
	
	const btnBuscar = (e) => {
		if(searchUser != '') {

			ApiUser.getUser(searchUser).then(res => {
	
				if(user.id != res.data.id) {
					setUser(res.data);
					
					const createdDate = new Date(res.data.created_at);
					const formatDate = `Joined ${createdDate.getDate()} 
										${createdDate.toLocaleString('default', { month: 'long' }).slice(0, 3)}
										${createdDate.getFullYear()}`;
					res.data.created_at = formatDate;
				}

				//Search REPOS USER
				 ApiUser.getRepos(searchUser).then(res => {
					setReposUser(res);
				})

				//Search FOLLOWERS USER
				ApiUser.getFollowers(searchUser).then(res => {
					setFollowersUser(res);
				})

				//Search FOLLOWING USER
				ApiUser.getFollowing(searchUser).then(res => {
					setFollowingUser(res);
				})	
				
				document.querySelector("input#search").value = '';
			})
		}

	}	

	const handleChangeSearch = (e) => {
		setSearchUser(e.target.value);
	};

  return (
    <>
      <main className="container-dad">
        <div className="container-theme">
        	<h2>devfinder</h2>
			<button type="button" className="btn-theme">LIGHT</button>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
			</svg>
        </div>

        <div className="search">
			<label htmlFor="search">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			</label>
        		<input 
					type="text"
					id="search"
					placeholder="Search Github username..."
				 	onChange={handleChangeSearch}
					maxLength="20"
				/>
			<button 
				type="submit"
				id="search"
				className="btn-search"
				onClick={() => btnBuscar()}
			>Search</button>
        </div>

			{
				user ? (
					<div className="container-data-api">
						
						<div className="logo img-desk">
							<img src={user.avatar_url} alt="img-user" />
						</div>

						<div className="container-rows">
						
							<div className="row1">
								<div className="logo img-mob">
									<img src={user.avatar_url} alt="img-user" />
								</div>
								<div className="info-user">
									<h2>{user.name}</h2>
									<a href={user.html_url} target="_blank">{user.login}</a>
									<p className="joined-mob">{user.created_at}</p>
								</div>
								
								<p className="joined-desk">{user.created_at}</p>
							</div>
							
							<div className="bio">
								<p>
									{
										user.bio ? user.bio : "This profile has no bio"
									}
								</p>
							</div>

							<div className="row2">
								<div className="column">
									<p>Repos</p>
									<p className="p-bold">{ reposUser }</p>
								</div>
								<div className="column">
									<p>Followers</p>
									<p className="p-bold">{ followersUser }</p>
								</div>
								<div className="column">
									<p>Following</p>
									<p className="p-bold">{ followingUser }</p>
								</div>
							</div>

							<div className="row3">
								<div className="line">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
									</svg>

									<p>
										{
											user.location ? user.location : "Location not defined"
										}
									</p>
								</div>
								<div className="line">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
									</svg>

									<a href={user.blog} style={{fontSize: '.95rem'}} target="_blank">
										{
											user.blog ? user.blog : "Not Available"
										}
									</a>
								</div>
								<div className="line">
									<svg fill="#d9d9d9" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
										<path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"/>
									</svg>

									<a href={`https://twitter.com/${user.twitter_username}`} target="_blank">
										{
											user.twitter_username ? user.twitter_username : "Not Available"
										}
									</a>
								</div>
								<div className="line">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
									</svg>

									<p>
										{
											user.company ? user.company : "Not Available"
										}
									</p>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="container-data-api aviso not-found">
						Search a user from github.
					</div>
				)
			}

      </main>
    </>
  );
}

export default App;
