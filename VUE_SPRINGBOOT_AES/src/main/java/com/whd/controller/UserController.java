package com.whd.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.whd.entity.UserEntity;
import com.whd.utils.AESUtil;
import com.whd.utils.SecretAnnotation;

@RestController
public class UserController {
	/*
     * 测试返回数据，会自动加密
     * @return
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value="/get",method=RequestMethod.GET)
    @SecretAnnotation(encode=true)
    public Map get(UserEntity entity) {
		System.out.println("---------------------------");
    	entity.setId("12345");
    	entity.setName("wexdfs");
    	Map map = new HashMap();
    	map.put("code", "0");
    	map.put("data", entity);
    	return map;
    }
    /*
     * 自动解密，并将返回信息加密
     * @param info
     * @return
     */

    @SuppressWarnings("rawtypes")
	@RequestMapping(value="/save",method=RequestMethod.POST,consumes="application/json;charset=UTF-8")
    @SecretAnnotation(decode=true,encode=true)
    public Map save(@RequestBody(required=false) UserEntity entity) throws Exception {
    	System.out.println(entity.getName());
    	Map<String,String> map = new HashMap<String,String>();
    	map.put("code", "0");
    	map.put("desc","success");
    	return map;
  }
    /**
     * 未使用注解的加解密
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/save1",method=RequestMethod.POST)
    public String save(HttpServletRequest request) throws Exception {
    	Enumeration<?> e = request.getParameterNames();  
    	String paramName = (String) e.nextElement();
    	UserEntity entity = JSON.parseObject(AESUtil.decrypt(paramName).trim(),UserEntity.class);
    	System.out.println(entity.getName());
    	Map<String,String> map = new HashMap<String,String>();
    	map.put("code", "0");
    	return AESUtil.encrypt(JSON.toJSONString(map));
  }
   
}
