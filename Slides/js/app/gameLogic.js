define(function() {
	var paddleWidth, paddleHeight, fieldHeight, fieldWidth;
	var difficulty = 1;
	var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

	var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

	var gameLogic =  {



		init : function  (pWidth,pHeight, fWidth, fHeight) {
			paddleHeight = pHeight;
			paddleWidth = pWidth;
			fieldHeight = fHeight;
			fieldWidth = fWidth

		},


		 ballPhysics : function (ball) {
			// if ball goes off the top side (side of table)
			if (ball.position.y <= -fieldHeight / 2) {
				ballDirY = -ballDirY;
			}
			// if ball goes off the bottom side (side of table)
			if (ball.position.y >= fieldHeight / 2) {
				ballDirY = -ballDirY;
			}


			// update ball position over time
			ball.position.x += ballDirX * ballSpeed;
			ball.position.y += ballDirY * ballSpeed;

			// limit ball's y-speed to 2x the x-speed
			// this is so the ball doesn't speed from left to right super fast
			// keeps game playable for humans
			if (ballDirY > ballSpeed * 2) {
				ballDirY = ballSpeed * 2;
			}
			else if (ballDirY < -ballSpeed * 2) {
				ballDirY = -ballSpeed * 2;
			}
		},

		 logic :  function (paddle1, paddle2, ball) {
			var paddle2DirY = (ball.position.y - paddle2.position.y) * difficulty;
			var paddle1DirY = (ball.position.y - paddle1.position.y) * difficulty;

			  if (ball.position.x <= -fieldWidth / 8) {
				  gameLogic.subLogic(paddle1, paddle1DirY);

			  }
			  // if ball goes off the bottom side (side of table)
			  if (ball.position.x >= fieldWidth / 8) {
				  gameLogic.subLogic(paddle2, paddle2DirY);


			  }

			 gameLogic.paddlePhysics(paddle1, paddle2, ball);

		},


		 subLogic :  function (paddle, dir) {

			// in case the Lerp function produces a value above max paddle speed, we clamp it
			if (Math.abs(dir) <= paddleSpeed) {
				paddle.position.y += dir;
			}
			else {
				// if paddle is lerping in +ve direction
				if (dir > paddleSpeed) {
					paddle.position.y += paddleSpeed;
				}
				// if paddle is lerping in -ve direction
				else if (dir < -paddleSpeed) {
					paddle.position.y -= paddleSpeed;
				}
			}
		},
		paddlePhysics: function(paddle1, paddle2, ball)
		{

			if (ball.position.x <= paddle1.position.x + paddleWidth
				&&  ball.position.x >= paddle1.position.x)
			{
				// and if ball is aligned with paddle1 on y plane
				if (ball.position.y <= paddle1.position.y + paddleHeight/2
					&&  ball.position.y >= paddle1.position.y - paddleHeight/2)
				{
					// and if ball is travelling towards player (-ve direction)
					if (ballDirX < 0)
					{
						// stretch the paddle to indicate a hit
					//	paddle1.scale.y = 15;
						// switch direction of ball travel to create bounce
						ballDirX = -ballDirX;
						// we impact ball angle when hitting it
						// this is not realistic physics, just spices up the gameplay
						// allows you to 'slice' the ball to beat the opponent
						ballDirY -= paddle1DirY * 0.7;
					}
				}
			}


			if (ball.position.x <= paddle2.position.x + paddleWidth
				&&  ball.position.x >= paddle2.position.x)
			{
				// and if ball is aligned with paddle2 on y plane
				if (ball.position.y <= paddle2.position.y + paddleHeight/2
					&&  ball.position.y >= paddle2.position.y - paddleHeight/2)
				{
					// and if ball is travelling towards opponent (+ve direction)
					if (ballDirX > 0)
					{
						// stretch the paddle to indicate a hit
					//	paddle2.scale.y = 15;
						// switch direction of ball travel to create bounce
						ballDirX = -ballDirX;
						// we impact ball angle when hitting it
						// this is not realistic physics, just spices up the gameplay
						// allows you to 'slice' the ball to beat the opponent
						ballDirY -= paddle2DirY * 0.7;
					}
				}
			}
		}
	};


	return gameLogic;

});


