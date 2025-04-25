const mongoose = require('mongoose');

const uri = "mongodb+srv://jso878729:tndus1127@cluster0.9ireq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    try {
        mongoose.connect(uri, {
            dbName: 'quizBoard',
        })
        console.log('몽고디비 연결 성공');
    } catch(error) {
        console.error('몽고디비 연결 에러', error)
    }
};


// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error)
})

mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊어졌습니다. 연결을 재시도합니다.')
    // 연결 재시도
})

module.exports = connect