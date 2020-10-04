import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;
global.contacts = [
	{
		"gender":"female",
		"name":{
			"title":"Mrs",
			"first":"Hazel",
			"last":"Chen"
		},
		"location":{
			"street":{
				"number":6257,
				"name":"Esmonde Road"
			},
			"city":"Timaru",
			"state":"Wellington",
			"country":"New Zealand",
			"postcode":27976,
			"coordinates":{
				"latitude":"63.2552",
				"longitude":"64.5134"
			},
			"timezone":{
				"offset":"+3:00",
				"description":"Baghdad, Riyadh, Moscow, St. Petersburg"
			}
		},
		"email":"hazel.chen@example.com",
		"login":{
			"uuid":"6088a4ce-3682-4d63-b270-5a936bbe3640",
			"username":"angrygoose696",
			"password":"iloveyou2",
			"salt":"yFi1Aomj",
			"md5":"9c3f1623f260c666a3aaa7bed117fa13",
			"sha1":"03794850456a99918e4bb4d3224f151e92caecd9",
			"sha256":"af587bf59ccc655269a81c661274c48513437fd3bc125bfef79ba0beb8cfd1fb"
		},
		"dob":{
			"date":"1977-09-09T04:45:17.786Z",
			"age":43
		},
		"registered":{
			"date":"2005-11-10T01:44:52.452Z",
			"age":15
		},
		"phone":"(779)-242-0785",
		"cell":"(520)-934-2924",
		"id":{
			"name":"",
			"value":null
		},
		"picture":{
			"large":"https://randomuser.me/api/portraits/women/42.jpg",
			"medium":"https://randomuser.me/api/portraits/med/women/42.jpg",
			"thumbnail":"https://randomuser.me/api/portraits/thumb/women/42.jpg"
		},
		"nat":"NZ"
	},
	{
		"gender":"male",
		"name":{
			"title":"Mr",
			"first":"Troy",
			"last":"Lucas"
		},
		"location":{
			"street":{
				"number":5314,
				"name":"Poplar Dr"
			},
			"city":"Hobart",
			"state":"South Australia",
			"country":"Australia",
			"postcode":2836,
			"coordinates":{
				"latitude":"46.2041",
				"longitude":"116.6367"
			},
			"timezone":{
				"offset":"+9:30",
				"description":"Adelaide, Darwin"
			}
		},
		"email":"troy.lucas@example.com",
		"login":{
			"uuid":"8840f474-f370-47f8-a8a7-94add6a40990",
			"username":"angrysnake636",
			"password":"maradona",
			"salt":"N1YAMsaM",
			"md5":"9468aac27485c938a623e21fab520d30",
			"sha1":"cd7cff49f4f02435b3ca1f2ad7b7b08d48020e47",
			"sha256":"da90d869ca5adec74a1b6df2a5b21380288716d555c6ba86d7da160d072a8397"
		},
		"dob":{
			"date":"1958-10-22T10:40:29.933Z",
			"age":62
		},
		"registered":{
			"date":"2012-12-15T05:04:01.351Z",
			"age":8
		},
		"phone":"07-3482-4477",
		"cell":"0437-503-069",
		"id":{
			"name":"TFN",
			"value":"865548568"
		},
		"picture":{
			"large":"https://randomuser.me/api/portraits/men/7.jpg",
			"medium":"https://randomuser.me/api/portraits/med/men/7.jpg",
			"thumbnail":"https://randomuser.me/api/portraits/thumb/men/7.jpg"
		},
		"nat":"AU"
	},
	{
		"gender":"female",
		"name":{
			"title":"Mrs",
			"first":"Angela",
			"last":"Henry"
		},
		"location":{
			"street":{
				"number":6473,
				"name":"Park Lane"
			},
			"city":"York",
			"state":"West Midlands",
			"country":"United Kingdom",
			"postcode":"M86 0DJ",
			"coordinates":{
				"latitude":"57.1384",
				"longitude":"34.4717"
			},
			"timezone":{
				"offset":"-12:00",
				"description":"Eniwetok, Kwajalein"
			}
		},
		"email":"angela.henry@example.com",
		"login":{
			"uuid":"491c57d4-77bc-45c9-851a-fd9886c8ae49",
			"username":"yellowmeercat477",
			"password":"tucson",
			"salt":"zqWDnBCL",
			"md5":"6007e2f41e24dc060ce63c3019a033cc",
			"sha1":"abcd3754535d33e170a89a70c993c689f44e3920",
			"sha256":"6de149606d90a6b48c4f464a0783d4785c26e6ee19a0a57b15fd6e0e3d05c6ba"
		},
		"dob":{
			"date":"1968-07-05T05:05:23.662Z",
			"age":52
		},
		"registered":{
			"date":"2002-12-17T15:14:40.643Z",
			"age":18
		},
		"phone":"0131 413 2855",
		"cell":"0768-341-732",
		"id":{
			"name":"NINO",
			"value":"TR 79 26 67 L"
		},
		"picture":{
			"large":"https://randomuser.me/api/portraits/women/86.jpg",
			"medium":"https://randomuser.me/api/portraits/med/women/86.jpg",
			"thumbnail":"https://randomuser.me/api/portraits/thumb/women/86.jpg"
		},
		"nat":"GB"
	}
];

// Fail tests on any warning
console.error = message => {
    throw new Error(message);
};
