
<?php 

$conn = new mysqli('localhost','hkr','hkr1234','vuephpcart');

if($conn->connect_error){
	die("Could not connect to database!");
}

$res = array();



//user read start

$action = 'read';

if(isset($_GET['action'])){
	$action = $_GET['action'];
}


if($action == 'read'){
	$result = $conn->query("SELECT * FROM `users`");
	$users = array();

	while($row = $result->fetch_assoc()){
		array_push($users, $row);
	}

	$res['users'] = $users;
}

//create 

if($action == 'create'){

	$username = $_POST['username'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];

	$result = $conn->query("INSERT INTO `users` (`username`, `email`, `mobile`) VALUES ('$username', '$email', '$mobile') ");
	
	if($result){
		$res['message'] = "User added successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not insert user";
    }
}

//login

if($action == 'login'){

	$username = $_POST['username'];
	$password = $_POST['password'];

	$result = $conn->query("select * from `users` where `username`='$username' and `password`='$password' ");
	
	if($result){
        $value =mysqli_fetch_array($result );
        $run_rows = mysqli_num_rows($result);
        if($run_rows>0){
            session_start();
            $_SESSION["username"] = $value['username'];
            $res['message'] = "login successfully";
        } else{
            $res['error'] = true;
            $res['message'] = "Login unsuccesfull";
        }
         //$res['message'] = "login successfully";
        // while($get_single_post = $result->fetch_assoc()){
        //     echo $get_single_post["username"];
        //     echo $get_single_post["email"];
        // }
	}
}

// update query 

if($action == 'update'){
	$id = $_POST['id'];
	$username = $_POST['username'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];

	$result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id'");
	
	if($result){
		$res['message'] = "User updated successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not update user";
	}

}


//delete
if($action == 'delete'){
	$id = $_POST['id'];
	

	$result = $conn->query("DELETE FROM `users` WHERE `id` = '$id'");
	
	if($result){
		$res['message'] = "User deleted successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not delete user";
	}

}

$conn->close();

header("Content-type: application/json");
echo json_encode($res);
die();
