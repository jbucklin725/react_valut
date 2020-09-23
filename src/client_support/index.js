import {NetworkService} from "./service";
import {Authenticator} from "./authentication";
 
export const ClientManager = function(){
	
	const proto = {
		service: NetworkService(),
		auth: Authenticator
	}

	return Object.assign({}, proto);
}