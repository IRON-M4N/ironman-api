"use strict";
var __assign = (this && this.__assign) || function () {
		__assign = Object.assign || function(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
						s = arguments[i];
						for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
								t[p] = s[p];
				}
				return t;
		};
		return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
		function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
				function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
				function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
				step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
};
var __generator = (this && this.__generator) || function (thisArg, body) {
		var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
		return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
		function verb(n) { return function (v) { return step([n, v]); }; }
		function step(op) {
				if (f) throw new TypeError("Generator is already executing.");
				while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
								case 0: case 1: t = op; break;
								case 4: _.label++; return { value: op[1], done: false };
								case 5: _.label++; y = op[1]; op = [0]; continue;
								case 7: op = _.ops.pop(); _.trys.pop(); continue;
								default:
										if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
										if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
										if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
										if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
										if (t[2]) _.ops.pop();
										_.trys.pop(); continue;
						}
						op = body.call(thisArg, _);
				} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
				if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
		}
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
		if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
						if (!ar) ar = Array.prototype.slice.call(from, 0, i);
						ar[i] = from[i];
				}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios_1 = require("axios");
var cheerio = require("cheerio");
var FormData = require("form-data");
var cp = require("child_process");
var ffmpeg = require("fluent-ffmpeg");
var function_1 = require("../lib/function");
function pinterest(url) {
		return __awaiter(this, void 0, void 0, function () {
				var headers, data, medias, highestQualityVideo_1, highestQualityImage_1, error_1;
				return __generator(this, function (_a) {
						switch (_a.label) {
								case 0:
										_a.trys.push([0, 2, , 3]);
										if (!(0, function_1.isURL)(url)) {
												throw new Error('Need pinterest url');
										}
										headers = {
												'User-Agent': (0, function_1.generateUA)(),
												'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
												'Accept-Language': 'en-US,en;q=0.5',
												'Connection': 'keep-alive',
										};
										return [4 /*yield*/, axios_1.default.get("https://pinterestdownloader.io/frontendService/DownloaderService?url=".concat(url), { headers: headers })];
								case 1:
										data = (_a.sent()).data;
										medias = data.medias;
										highestQualityVideo_1 = null;
										highestQualityImage_1 = null;
										medias.forEach(function (media) {
												if (media.extension === 'mp4') {
														if (!highestQualityVideo_1 || media.quality > highestQualityVideo_1.quality) {
																highestQualityVideo_1 = media;
														}
												}
												else if (media.extension === 'jpg' || media.extension === 'png') {
														if (!highestQualityImage_1 || media.quality > highestQualityImage_1.quality) {
																highestQualityImage_1 = media;
														}
												}
										});
										return [2 /*return*/, highestQualityVideo_1 ? highestQualityVideo_1.url : highestQualityImage_1 === null || highestQualityImage_1 === void 0 ? void 0 : highestQualityImage_1.url];
								case 2:
										error_1 = _a.sent();
										(0, function_1.err)(error_1);
										throw error_1;
								case 3: return [2 /*return*/];
						}
				});
		});
}
function telegraph(Path) {
		return __awaiter(this, void 0, void 0, function () {
				var _this = this;
				return __generator(this, function (_a) {
						return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
										var form, data, fileUrl, error_2;
										return __generator(this, function (_a) {
												switch (_a.label) {
														case 0:
																if (!fs.existsSync(Path)) {
																		(0, function_1.err)("File not found");
																		return [2 /*return*/, reject(new Error("File not found"))];
																}
																_a.label = 1;
														case 1:
																_a.trys.push([1, 3, , 4]);
																form = new FormData();
																form.append("file", fs.createReadStream(Path));
																return [4 /*yield*/, (0, axios_1.default)({
																				url: "https://telegra.ph/upload",
																				method: "POST",
																				headers: __assign({}, form.getHeaders()),
																				data: form
																		})];
														case 2:
																data = (_a.sent()).data;
																fileUrl = "https://telegra.ph" + data[0].src;
																if (!(0, function_1.isURL)(fileUrl)) {
																		(0, function_1.err)("Uploaded file is invalid");
																		return [2 /*return*/, reject(new Error("Uploaded file is invalid"))];
																}
																resolve(fileUrl);
																return [3 /*break*/, 4];
														case 3:
																error_2 = _a.sent();
																(0, function_1.err)(error_2.message);
																reject(new Error(String(error_2)));
																return [3 /*break*/, 4];
														case 4: return [2 /*return*/];
												}
										});
								}); })];
				});
		});
}
var m3u8 = /** @class */ (function () {
		function m3u8() {
				this.useCLI = false;
				this.Output = './output.mp4';
		}
		m3u8.prototype.InputFile = function (filename) {
				if (!filename)
						throw new Error("Need the path or url");
				this.Input = filename;
				return this;
		};
		m3u8.prototype.OutputFile = function (filename) {
				if (!filename)
						throw new Error("Need output path");
				this.Output = filename;
				return this;
		};
		m3u8.prototype.UseCLI = function (useCLI) {
				this.useCLI = useCLI;
				return this;
		};
		m3u8.prototype.start = function (options) {
				var _this = this;
				if (options === void 0) { options = {}; }
				options = Object.assign({
						onStart: function () { },
						onEnd: function () { },
						onError: function (error) {
								throw new Error(error);
						},
						onProgress: function () { },
						onStderr: function () { },
						onCodecData: function () { },
				}, options);
				return new Promise(function (resolve, reject) {
						if (!_this.Input) {
								reject(new Error("Need input and output path (input can be url)"));
								return;
						}
						if (_this.useCLI) {
								var command = "ffmpeg -i ".concat(_this.Input, " -c copy -bsf:a aac_adtstoasc ").concat(_this.Output);
								var process_1 = cp.spawn(command, { shell: true });
								process_1.stdout.on('data', function (data) {
										var _a;
										(_a = options.onProgress) === null || _a === void 0 ? void 0 : _a.call(options, data.toString());
								});
								process_1.stderr.on('data', function (data) {
										var _a;
										(_a = options.onStderr) === null || _a === void 0 ? void 0 : _a.call(options, data.toString());
								});
								process_1.on('error', function (error) {
										var _a;
										reject(new Error("ffmpeg error: ".concat(error)));
										(_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, "ffmpeg error: ".concat(error));
								});
								process_1.on('close', function (code) {
										var _a, _b;
										if (code === 0) {
												resolve();
												(_a = options.onEnd) === null || _a === void 0 ? void 0 : _a.call(options);
										}
										else {
												var errorMsg = "ffmpeg exited with code ".concat(code);
												reject(new Error(errorMsg));
												(_b = options.onError) === null || _b === void 0 ? void 0 : _b.call(options, errorMsg);
										}
								});
						}
						else {
								ffmpeg(_this.Input)
										.on('start', options.onStart)
										.on('codecData', options.onCodecData)
										.on('progress', options.onProgress)
										.on("error", function (error) {
										var _a;
										reject(new Error(error));
										(_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, error);
								})
										.on('stderr', options.onStderr)
										.on("end", function () {
										var _a;
										var args = [];
										for (var _i = 0; _i < arguments.length; _i++) {
												args[_i] = arguments[_i];
										}
										resolve();
										(_a = options.onEnd) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([options], args, false));
								})
										.outputOptions("-c copy")
										.outputOptions("-bsf:a aac_adtstoasc")
										.output(_this.Output)
										.run();
						}
				});
		};
		return m3u8;
}());
function tiktok(tturl) {
		return __awaiter(this, void 0, void 0, function () {
				var requestUrl, headers, formData, response, $_1, title, urls, error_3;
				return __generator(this, function (_a) {
						switch (_a.label) {
								case 0:
										requestUrl = 'https://ssstiktok.ws/mates/en/analyze/ajax?retry=undefined&platform=tiktok';
										headers = {
												'Accept': 'application/json, text/javascript, */*; q=0.01',
												'Accept-Encoding': 'gzip, deflate, br',
												'Accept-Language': 'en-US,en;q=0.9',
												'Cache-Control': 'no-cache',
												'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
												'Origin': 'https://ssstiktok.ws',
												'Pragma': 'no-cache',
												'Referer': 'https://ssstiktok.ws/',
												'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
												'Sec-Ch-Ua-Mobile': '?1',
												'Sec-Ch-Ua-Platform': '"Android"',
												'Sec-Fetch-Dest': 'empty',
												'Sec-Fetch-Mode': 'cors',
												'Sec-Fetch-Site': 'same-origin',
												'User-Agent': (0, function_1.generateUA)(),
												'X-Requested-With': 'XMLHttpRequest'
										};
										formData = new URLSearchParams();
										formData.append('url', tturl);
										formData.append('ajax', '1');
										formData.append('lang', 'en');
										_a.label = 1;
								case 1:
										_a.trys.push([1, 3, , 4]);
										return [4 /*yield*/, axios_1.default.post(requestUrl, formData, { headers: headers })];
								case 2:
										response = _a.sent();
										$_1 = cheerio.load(response.data.result);
										title = $_1('#myModalLabel').text().trim();
										urls = $_1('a').map(function (index, element) { return $_1(element).attr('href'); }).get();
										return [2 /*return*/, { title: title, url: urls }];
								case 3:
										error_3 = _a.sent();
										(0, function_1.err)(error_3.message);
										throw error_3;
								case 4: return [2 /*return*/];
						}
				});
		});
}
function fileUguu(filePath) {
		return __awaiter(this, void 0, void 0, function () {
				var form, response, error_4;
				return __generator(this, function (_a) {
						switch (_a.label) {
								case 0:
										form = new FormData();
										form.append("files[]", fs.createReadStream(filePath));
										_a.label = 1;
								case 1:
										_a.trys.push([1, 3, , 4]);
										return [4 /*yield*/, (0, axios_1.default)({
														url: "https://uguu.se/upload.php",
														method: "POST",
														headers: __assign({ "User-Agent": (0, function_1.generateUA)() }, form.getHeaders()),
														data: form
												})];
								case 2:
										response = _a.sent();
										return [2 /*return*/, response.data.files[0]];
								case 3:
										error_4 = _a.sent();
										(0, function_1.err)(error_4.message);
										throw error_4;
								case 4: return [2 /*return*/];
						}
				});
		});
}
function mediafire(url) {
		return __awaiter(this, void 0, void 0, function () {
				var $, urlx, _a, nameFile, mime, result, error_5;
				return __generator(this, function (_b) {
						switch (_b.label) {
								case 0:
										_b.trys.push([0, 2, , 3]);
										if (!(0, function_1.isURL)(url)) {
												throw new Error('Need mediafire url');
										}
										return [4 /*yield*/, axios_1.default.get(url).then(function (res) { return cheerio.load(res.data); })];
								case 1:
										$ = _b.sent();
										urlx = $('a#downloadButton').attr('href');
										_a = urlx.split('/').pop().split('.'), nameFile = _a[0], mime = _a[1];
										result = {
												title: nameFile,
												url: urlx,
												size: $('a#downloadButton').text().replace(/[^\d\.]/g, ''),
												mime: mime,
												filetype: $('.dl-info > div > div.filetype').text(),
												desc: $('div.description > p.description-subheading').text(),
												uploadTime: $('ul.details > li:nth-child(2)').text().split(": ")[1],
										};
										return [2 /*return*/, result];
								case 2:
										error_5 = _b.sent();
										(0, function_1.err)(error_5.message);
										throw new Error(String(error_5));
								case 3: return [2 /*return*/];
						}
				});
		});
}
module.exports = { pinterest: pinterest, telegraph: telegraph, tiktok: tiktok, fileUguu: fileUguu, mediafire: mediafire, m3u8: m3u8 };